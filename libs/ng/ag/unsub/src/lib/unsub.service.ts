import { Injectable, OnDestroy } from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { isFunction } from '@agx/utils';

/** An injectable service class that handles auto cancellation of subscriptions */
@Injectable()
export class UnsubService implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  subscriptions: Subscription[] = [];

  /**
   * Registers all subscriptions that need auto cancellation on destroy
   * @param subscription Subscription or a list of Subscription
   */
  autoUnsubscribe(subscription: Subscription | Subscription[]) {
    if (Array.isArray(subscription)) {
      this.subscriptions = [...this.subscriptions, ...subscription];
    } else {
      this.subscriptions.push(subscription);
    }
  }

  /** Handles auto cancellation of all subscriptions on destroy */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();

    this.subscriptions.forEach(subscription => {
      if (subscription && subscription.unsubscribe && isFunction(subscription.unsubscribe)) {
        subscription.unsubscribe();
      }
    });
  }
}
