import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ActionsMenuComponent} from './_component/game-instance/actions-menu/actions-menu.component';
import {BoardComponent} from './_component/game-instance/board/board.component';
import {FieldComponent} from './_component/game-instance/field/field/field.component';
import {CardFieldComponent} from './_component/game-instance/field/card-field/card-field.component';
import {TownFieldComponent} from './_component/game-instance/field/town-field/town-field.component';
import {UtilityFieldComponent} from './_component/game-instance/field/utility-field/utility-field.component';
import {CardGroupInfoComponent} from './_component/game-instance/field-info/card-group-info/card-group-info.component';
import {FieldInfoComponent} from './_component/game-instance/field-info/field-info/field-info.component';
import {TownInfoComponent} from './_component/game-instance/field-info/town-info/town-info.component';
import {UtilityInfoComponent} from './_component/game-instance/field-info/utility-info/utility-info.component';
import {GameComponent} from './_component/game-instance/game/game.component';
import {TransactionContainerComponent} from './_component/game-instance/transaction/transaction-container/transaction-container.component';
import {GamesListComponent} from './_component/games-list/games-list/games-list.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {TransactionResponseService} from "./_service/response/transaction/transaction-response.service";
import {CookieService} from "ngx-cookie-service";
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from "@stomp/ng2-stompjs";
import {myRxStompConfig} from "./my-rx-stomp.config";
import {ChatWindowComponent} from './_component/game-instance/chat/chat-window/chat-window.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    MatBottomSheetModule,
    MatButtonModule, MatCardModule,
    MatCheckboxModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule, MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule, MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import {
    NewDiscountForm, NewImprovementForm,
    TransactionAddComponent
} from './_component/game-instance/transaction/offer/transaction-add/transaction-add.component';
import {TransferableItemComponent} from './_component/game-instance/transaction/offer/transferable-item/transferable-item.component'
import {TransactionRemoveComponent} from "./_component/game-instance/transaction/offer/transaction-remove/transaction-remove.component";
import {FirstRowComponent} from './_component/game-instance/transaction/offer/first-row/first-row.component';
import {OfferComponent} from "./_component/game-instance/transaction/offer/offer/offer.component";
import {StartTransactionComponent} from './_component/game-instance/transaction/start-transaction/start-transaction.component';
import {TransactionComponent} from './_component/game-instance/transaction/transaction/transaction.component';
import { TransactionStatusComponent } from './_component/game-instance/transaction/transaction-status/transaction-status.component';
import { PropertyDirective } from './_service/game/chat/property.directive';
import { ChatMessageComponent } from './_component/game-instance/chat/chat-message/chat-message.component';
import { PlayerInfoComponent } from './_component/game-instance/field-info/player-info/player-info.component';
import {AngularFontAwesomeModule} from "angular-font-awesome";

@NgModule({
  declarations: [
    AppComponent,
    ActionsMenuComponent,
    BoardComponent,
    FieldComponent,
    CardFieldComponent,
    TownFieldComponent,
    UtilityFieldComponent,
    CardGroupInfoComponent,
    FieldInfoComponent,
    TownInfoComponent,
    UtilityInfoComponent,
    GameComponent,
    GamesListComponent,
    TransactionContainerComponent,
    ChatWindowComponent,
    TransactionAddComponent,
    TransactionRemoveComponent,
    OfferComponent,
    TransferableItemComponent,
    TransactionRemoveComponent,
    FirstRowComponent,
    OfferComponent,
    StartTransactionComponent,
    TransactionComponent,
    TransactionStatusComponent,
    PropertyDirective,
    ChatMessageComponent,
    NewDiscountForm,
    PlayerInfoComponent,
    NewImprovementForm
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatBottomSheetModule,
        MatMenuModule,
        MatListModule,
        MatFormFieldModule,
        MatSliderModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatSlideToggleModule,
        MatCardModule,
        MatTabsModule,
        MatExpansionModule,
        MatSelectModule,
        AngularFontAwesomeModule
    ],
  providers: [
    TransactionResponseService,
    CookieService,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
