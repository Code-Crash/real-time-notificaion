import { fail } from 'assert';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Notification, Profile, FireLoopRef } from './shared/sdk/models';
import { Observable } from 'rxjs/Observable';
import { LoopBackConfig, LoggerService } from './shared/sdk';
import { BASE_URL, MEDIA_AVATARS_DOWNLOAD, API_VERSION } from './shared/base.url';
import { RealTime, NotificationApi, ProfileApi } from './shared/sdk/services';
import { MatTableDataSource, MatSort, MatTabGroup } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Notificaion Variables
  private notification: Notification = new Notification();
  private notifications: Notification[];
  private allNotifications: Notification[];
  private NotificationReference: FireLoopRef<Notification>;

  // Profile Variables
  private profile: Profile = new Profile();
  private profiles: Profile[];
  private ProfileReference: FireLoopRef<Profile>;

  // Other Variables
  displayedColumns = ['createdBy', 'text', 'isRead', 'actions'];
  realTimeDisplayedColumns = ['createdBy', 'text', 'isRead', 'actions'];
  title = 'Notifications';
  unRealNotif: Number = 0;
  mediaUrl = MEDIA_AVATARS_DOWNLOAD;
  dataSource = new MatTableDataSource<Notification>([]);
  realTimeNotificationDataSource = new MatTableDataSource<Notification>([]);
  tabIndex: Number = 0;
  profileCtrl: FormControl;
  notificationControl: FormControl;
  filteredProfile: Observable<Profile[]>;
  filteredNotificationOptions: Observable<string[]>;
  notificationOptions = [
    'posted photo on your wall.',
    'commented on your last video',
    'commented on your photo',
    'like your post',
    'like your video.'
  ];

  // Directives base variables
  @Input()
  overlapTrigger: false;
  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  constructor(private realTime: RealTime,
    private profileApi: ProfileApi,
    private notificationApi: NotificationApi) {

    /**
     * @desc Set default URL and Version for loopback and fireloop.
     */
    LoopBackConfig.setBaseURL(BASE_URL);
    LoopBackConfig.setApiVersion(API_VERSION);

    // Initilize References for fireloop to use for realTime.
    this.realTime.onReady().subscribe((status: string) => {
      this.ProfileReference = this.realTime.FireLoop.ref<Profile>(Profile);
      this.NotificationReference = this.realTime.FireLoop.ref<Notification>(Notification);
      this.realTimeNotificaions();
    });

    this.searchLogic();
  }

  /**
   * @desc This function contain the search machanisum for the user and notificaion type for playground.
   */
  searchLogic(): void {

    // User Search.
    this.profileCtrl = new FormControl();
    this.profileCtrl.valueChanges
      .startWith('')
      .subscribe(username => {
        this.profileApi.find({ where: { username: { like: username } } })
          .subscribe((profiles: Profile[]) => {
            return this.profiles = profiles;
          });
      });

    // Notification Type Search
    this.notificationControl = new FormControl();
    this.filteredNotificationOptions = this.notificationControl.valueChanges
      .startWith('')
      .map(val => this.filterNotifications(val));

  }

  // Filter notifications from constant
  filterNotifications(val: string): string[] {
    return this.notificationOptions.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  realTimeNotificaions(): void {
    // We initially pull only 5 notificaion and those only latest createdAt.
    this.NotificationReference.on('change', {
      offset: 0,
      limit: 5,
      order: 'createdAt DESC',
      include: 'createdBy'
    }).subscribe((notifications: Array<Notification>) => {
      this.notifications = []; // Re-Initilize the value
      this.unRealNotif = 0; // Re-Initilize the value
      this.notifications = notifications;
      this.realTimeNotificationDataSource = new MatTableDataSource<Notification>(this.notifications);
      const count = _.countBy(this.notifications, function (notif) {
        return notif.isRead ? 'read' : 'unread';
      });
      this.unRealNotif = count.unread || 0;
      // this.getAllNotifications(); // This will get All Notifications realtime, not not a good idea.
    });

    // Pull All Profiles Again if anything changes to maintain array
    this.ProfileReference.on('change').subscribe((profiles: Array<Profile>) => {
      this.profiles = [];
      this.profiles = profiles;
    });

  }

  /**
   * @desc This function will let you know the current tab index.
   */
  onSelectedIndexChange(newTabIndex) {
    if (this.tabIndex !== newTabIndex) {
      this.tabIndex = newTabIndex;
    }
    if (newTabIndex === 1) {
      this.getAllNotifications();
    }
  }

  /**
   * @desc This function will trigger from notificaion dropdown to see and jump on all notifications.
   */
  jumpOnAllNotificaionTab(): void {
    this.tabIndex = 1;
  }

  /**
   * @desc It will trigger from notificaion autoCompletee to select the notifiocan for CRUD opration.
   */
  selectedNotification(selectedNotif) {
    if (selectedNotif) {
      this.notification.text = selectedNotif;
    }
  }

  /**
   * @desc It will trigger from profile autoCompletee to select the profile for CRUD opration.
   */
  selectedProfile(selectedProfile) {
    if (selectedProfile && selectedProfile.id) {
      this.notification.createdById = selectedProfile.id;
    }
  }

  /**
   * @desc It will add new notificaion if the notificaion is valid else log the error.
   */
  add(): void {
    if (this.notification && this.notification.text && this.notification.createdById) {
      this.NotificationReference.create(this.notification).subscribe((notif: Notification) => {
        this.notification.text = '';
        this.notification.createdById = null;
        this.notificationControl.setValue('');
        this.profileCtrl.setValue('');
      });
    } else {
      console.log('Data Not Valid!');
    }
  }

  /**
   * @desc It will update the notificaion real time.
   */
  update(notification: Notification): void {
    this.NotificationReference.upsert(notification).subscribe();
  }

  /**
   * @desc It will permanently delete the notificaion from datasource(DB or Memory).
   */
  remove(notification: Notification): void {
    this.NotificationReference.remove(notification).subscribe();
    // this.getAllNotifications(); // If we delete any one notif, get all notif again or remove from array.
  }

  /**
  * @desc Mark isRead status as true for a notificaion
  */
  read(notification: Notification): void {
    notification.isRead = true;
    this.NotificationReference.upsert(notification).subscribe();
  }

  /**
   * @desc Mark isRead status as false for a notificaion
   */
  unread(notification: Notification): void {
    notification.isRead = false;
    this.NotificationReference.upsert(notification).subscribe();
  }

  /**
   * @desc This function will get called when user will go on all notificaion tab or click the See All in dropdwon notificaion.
   */
  getAllNotifications(): void {
    this.notificationApi.find({ include: 'createdBy' }).subscribe((allNotifications: Array<Notification>) => {
      this.allNotifications = allNotifications;
      this.dataSource = new MatTableDataSource<Notification>(this.allNotifications);
      console.log('Length:', this.allNotifications.length);
    });
  }

  /**
   * @author Code-Crash
   * @desc This method will mark all the notificaions as read but not all,
   *        it will mark read for the initial notificaions which are showing in the notification dropdown.
   */
  allRead(): void {
    const self = this;
    _.each(this.notifications, function (notif) {
      if (notif.isRead === false) {
        notif.isRead = false;
        self.read(notif);
      }
    });
  }

}

