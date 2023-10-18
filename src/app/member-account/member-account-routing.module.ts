import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MemberNavComponent } from './member-nav/member-nav.component';
import { MemberLegalComponent } from './member-legal/member-legal.component';
import { MemberBioComponent } from './member-bio/member-bio.component';
import { MemberExperienceComponent } from './member-experience/member-experience.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberProfileDeleteComponent } from './member-profile-delete/member-profile-delete.component';
import { MemberGuardCardComponent } from './member-guard-card/member-guard-card.component';
import { MemberPersonalDetailsComponent } from './member-personal-details/member-personal-details.component';
import { MemberPersonalResumeComponent } from './member-personal-resume/member-personal-resume.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    MemberDashboardComponent,
    MemberNavComponent,
    MemberLegalComponent,
    MemberBioComponent,
    MemberExperienceComponent,
    MemberProfileComponent,
    MemberProfileDeleteComponent,
    MemberGuardCardComponent,
    MemberPersonalDetailsComponent,
    MemberPersonalResumeComponent
  ]
})
export class MemberAccountRoutingModule { }
