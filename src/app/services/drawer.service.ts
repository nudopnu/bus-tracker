import { Component, Injectable, Type } from '@angular/core';
import { NzDrawerOptions, NzDrawerPlacement, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  private placement: NzDrawerPlacement = 'left';
  private drawerRef: NzDrawerRef | undefined;

  constructor(
    private drawerService: NzDrawerService,
  ) {
    new ResizeObserver((callback) => {
      const { blockSize, inlineSize } = callback[0].devicePixelContentBoxSize[0];
      if (inlineSize < 768) {
        this.placement = 'bottom';
      } else {
        this.placement = 'left';
      }
    }).observe(document.body);
  }

  openComponent<T extends {}, V>(component: Type<T>, options: NzDrawerOptions<T, V extends undefined ? {} : V>): void {
    if (this.drawerRef) {
      this.drawerRef.close();
      this.drawerRef = undefined;
    }
    this.drawerRef = this.drawerService.create<T, V, string>({
      nzTitle: 'Component',
      nzFooter: 'Footer',
      nzExtra: 'Extra',
      nzPlacement: this.placement,
      nzContent: component,
      nzMaskStyle: {
        'display': 'none',
        'pointer-events': 'none',
      },
      ...options,
    });

    this.drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    this.drawerRef.afterClose.subscribe(data => {
      console.log(data);
    });
  }
}
