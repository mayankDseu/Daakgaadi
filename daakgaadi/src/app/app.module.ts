import { HttpClientModule } from '@angular/common/http';



import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

// components for views and layouts

import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";

import { MapExampleComponent } from "./components/maps/map-example/map-example.component";

import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import { RateChartComponent } from './views/auth/rate-chart/rate-chart.component';
 import { FlipComponent } from './views/landing/flip/flip.component';
import { FliptwoComponent } from './views/landing/fliptwo/fliptwo.component';
import { FlipthreeComponent } from './views/landing/flipthree/flipthree.component';
import { FlipfourComponent } from './views/landing/flipfour/flipfour.component';
import { BikeComponent } from './views/landing/bike/bike.component';
import { FlipbikeComponent } from './views/landing/flipbike/flipbike.component';
import { CourierComponent } from './views/landing/courier/courier.component';
import { LandpageDropdownComponent } from './components/dropdowns/landpage-dropdown/landpage-dropdown.component';
import { LandauthNavbarComponent } from './components/navbars/landauth-navbar/landauth-navbar.component';
import { LandauthpageDropdownComponent } from './components/dropdowns/landauthpage-dropdown/landauthpage-dropdown.component';
 import { GetestComponent } from './views/landing/getest/getest.component';
import { BikeestComponent } from './views/landing/bikeest/bikeest.component';
import { TruckestComponent } from './views/landing/truckest/truckest.component';
import { PackestComponent } from './views/landing/packest/packest.component';
import { TwowheelComponent } from './views/landing/twowheel/twowheel.component';
import { TruckwheelComponent } from './views/landing/truckwheel/truckwheel.component';
import { ProfsideComponent } from './views/landing/profside/profside.component';
 import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InvoiceformComponent } from './views/landing/invoiceform/invoiceform.component';
import { SendEmailComponent } from './views/landing/send-email/send-email.component';

import { GetuserComponent } from './components/cards/getuser/getuser.component';
import { CalculatorComponent } from './views/landing/calculator/calculator.component';
import { ComplaintComponent } from './components/cards/complaint/complaint.component';
import { ReestComponent } from './components/cards/reest/reest.component';



 
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,

    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,

    AdminComponent,
    AuthComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    LoginComponent,
    RegisterComponent,
    
   
    LandingComponent,
    ProfileComponent,
    RateChartComponent,
    FlipComponent,
    FliptwoComponent,
    FlipthreeComponent,
    FlipfourComponent,
    BikeComponent,
    FlipbikeComponent,
    CourierComponent,
    LandpageDropdownComponent,
    LandauthNavbarComponent,
    LandauthpageDropdownComponent,
     GetestComponent,
    BikeestComponent,
    TruckestComponent,
    PackestComponent,
    TwowheelComponent,
    TruckwheelComponent,
    ProfsideComponent,
    InvoiceformComponent,
    SendEmailComponent,

    GetuserComponent,

    CalculatorComponent,

    ComplaintComponent,

    ReestComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
