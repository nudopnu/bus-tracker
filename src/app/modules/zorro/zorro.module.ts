import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline, SearchOutline } from '@ant-design/icons-angular/icons';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill, SearchOutline];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzIconModule.forRoot(icons)
  ],
  exports: [
    NzAutocompleteModule,
    NzIconModule,
    NzInputModule,
    NzDrawerModule,
  ]
})
export class ZorroModule { }
