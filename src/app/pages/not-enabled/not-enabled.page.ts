import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';

@Component({
  selector: 'app-not-enabled',
  templateUrl: './not-enabled.page.html',
  styleUrls: ['./not-enabled.page.scss'],
})
export class NotEnabledPage implements OnInit {

  constructor(
    private translateConfig:TranslateConfigService,
   private service:TranslateService
  ) { }

  ngOnInit() {
    this.service.use(this.translateConfig.currentLang)
  }

}
