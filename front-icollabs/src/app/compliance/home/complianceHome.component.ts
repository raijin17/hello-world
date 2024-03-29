import { Component, OnInit, ViewChild     } from '@angular/core';
import { ComponentFactoryResolver         } from '@angular/core';
import { ViewContainerRef, Input          } from '@angular/core';
import { ActivatedRoute                   } from '@angular/router';
import { Subscription                     } from 'rxjs';
import { SecurityService                  } from 'src/app/core/services/security.service';
import { LegalAgreementComponent          } from 'src/app/compliance/business/legalAgreement/legalAgreement.component';
import { ThemeService                     } from 'src/app/core/globals/theme';
import { EventMessage                     } from 'src/app/core/models/EventMessage';
import { EventService                     } from 'src/app/core/services/event.service';
import { ChangePasswordComponent          } from 'src/app/common/changePassword/changePassword.component';
import { GlobalService                    } from 'src/app/core/globals/global.service';
import { ComplianceWelcomeComponent       } from './welcome/complianceWelcome.component';
import { ComplianceTypesComponent         } from '../catalogs/compliance/types/complianceTypes.component';
import { ComplianceTypesEditComponent     } from '../catalogs/compliance/types/edit/complianceTypesEdit.component';
import { ActivitiesComponent              } from '../catalogs/activities/activities.component';
import { ActivitiesEditComponent          } from '../catalogs/activities/edit/activitiesEdit.component';
import { ComplianceConfigurationComponent } from '../catalogs/compliance/configuration/complianceConfiguration.component';
import { ConfigActivitiesComponent        } from '../catalogs/compliance/configuration/configActivities/configActivities.component';
import { AcquisitionsComponent            } from '../business/acquisitions/acquisitions.component';
import { PerfilHomeComponent              } from '../business/perfil/home/perfilHome.component';
import { TaskPlanningComponent            } from '../administration/task-planning/task-planning.component';
import { TaskEditComponent                } from '../administration/task-planning/home-edit/task-edit/task-edit.component';
import { TemplateEditTaskComponent        } from '../administration/task-planning/home-edit/template-edit-task/template-edit-task.component';
import { HighComponent				      } from 'src/app/compliance/resources/staff/high/high.component';
import { ResourcePerfilComponent          } from 'src/app/compliance/resources/staff/perfil/perfil.component';

@Component({
	selector        : 'app-complianceHome',
	templateUrl     : './complianceHome.component.html',
	styleUrls       : ['./complianceHome.component.scss'],
	entryComponents : [
		 ChangePasswordComponent
		,ComplianceWelcomeComponent
		,ComplianceTypesComponent
		,ComplianceTypesEditComponent
		,ActivitiesComponent
		,ActivitiesEditComponent
		,ComplianceConfigurationComponent
		,ConfigActivitiesComponent
		,AcquisitionsComponent
		,PerfilHomeComponent
		,LegalAgreementComponent
		,TaskPlanningComponent
		,TaskEditComponent
		,TemplateEditTaskComponent
		,HighComponent
		,ResourcePerfilComponent
	]
})
export class ComplianceHomeComponent implements OnInit {
	@ViewChild('container', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
	private subscriptions : Subscription[] = [];

	constructor(
		private  route                    : ActivatedRoute
		,private componentFactoryResolver : ComponentFactoryResolver
		,public  theme                    : ThemeService
		,public  globalService            : GlobalService
		,private eventService             : EventService
		,private securityService          : SecurityService
	) {
		globalService.setApp('Compliance');
	}

	ngOnInit() {
		//let url = `/assets/css/base/respaldo.css`;
		//document.getElementById("content_theme").setAttribute('href',url);
		this.subscribeOnChangePage();
	}

	ngAfterViewInit() {

		//this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(LegalAgreementComponent));
		this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceWelcomeComponent));
	}

	ngOnDestroy(){
		for (const iterator in this.subscriptions) {
			this.subscriptions[iterator].unsubscribe();
		}
	}
	  	
	subscribeOnChangePage(){
		debugger;
		this.subscriptions.push(this.eventService.onChangePage.subscribe({
			next: (event: EventMessage) => {

				this.globalService.setPage(event);
				this.viewContainerRef.clear();
				switch (event.descriptor) {
					case 'Compliance.Home':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceWelcomeComponent))
							.changeDetectorRef
							.detectChanges();
						break;
					case 'Compliance.Autoridades':
					case 'Compliance.ComplianceTypesComponent':
						let refComplianceTypes = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceTypesComponent));
						refComplianceTypes.instance.nombreCatalogo = 'authorities';
						refComplianceTypes.changeDetectorRef.detectChanges();
						break;
					case "Compliance.Autoridades.ABC":
						let refComplianceTypesEdit = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceTypesEditComponent));
						refComplianceTypesEdit.instance.catalogType = event.data;
						refComplianceTypesEdit.changeDetectorRef.detectChanges();
						break;
					case 'Compliance.Categorías':
						let refActivities =
							this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(ActivitiesComponent));
						refActivities.instance.nombreCatalogo = 'categories';
						refActivities.changeDetectorRef.detectChanges();
						break;  
					case 'Compliance.Categorías.ABC':
						let refActivitiesEdit = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ActivitiesEditComponent));
						refActivitiesEdit.instance.catalogType = event.data;
						refActivitiesEdit.changeDetectorRef.detectChanges();
						break;  
					case 'Compliance.Características': //Compliance.ConfiguracionDeCumplimientos.CumplimientoLegal.Caracteristicas
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ComplianceConfigurationComponent))
							.changeDetectorRef.detectChanges();
						break;
					case 'Compliance.Características.ABC': //Compliance.ConfiguracionDeCumplimientos.CumplimientoLegal.Caracteristicas.ABC
						let refConfigActivities = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ConfigActivitiesComponent));
						refConfigActivities.instance.catalogType = event.data;
						refConfigActivities.changeDetectorRef.detectChanges();
					break;
					case 'Compliance.Personal Competente':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(AcquisitionsComponent))
							.changeDetectorRef.detectChanges();
						break;
					
					case 'Compliance.Personal Competente.11':
						let refPerfilHome = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(PerfilHomeComponent));
							refPerfilHome.instance.idEmpleado = event.data.idEmpleado;
							refPerfilHome.instance.isViewable = true;
							refPerfilHome.instance.isdisabled = event.data.isdisabled;
							refPerfilHome.instance.tipo       = event.data.tipo;
							refPerfilHome.changeDetectorRef.detectChanges();
						break;
						
					case 'Compliance.Personal Competente.TaskEditComponent.14': // TaskEditComponent
						const _refTaskEdit = this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(TemplateEditTaskComponent));
						_refTaskEdit.instance.complianceId = event.data.id;
						_refTaskEdit.instance.accion = event.data.action;
						_refTaskEdit.changeDetectorRef.detectChanges();
						break;
					case 'Compliance.Personal Competente.TaskEditComponent.14.hijo': // TaskEditComponent
						const factoryTaskEdit = this.componentFactoryResolver.resolveComponentFactory(TaskEditComponent);
						const refTaskEdit = this.viewContainerRef.createComponent(factoryTaskEdit);
						//refTaskEdit.instance.catalogType = event.data;
						refTaskEdit.changeDetectorRef.detectChanges();
						break;
				
					case 'Compliance.legalAgreement':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(LegalAgreementComponent))
							.changeDetectorRef.detectChanges();
						break;
					case 'Compliance.Cumplimiento Interno':
						break;
					case 'Compliance.Planeación':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(TaskPlanningComponent))
							.changeDetectorRef.detectChanges();
						break;
					case 'shared.header.changePassword':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ChangePasswordComponent)).changeDetectorRef.detectChanges();
						break;
					case 'Compliance.registerPersonal':
						this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(HighComponent)).changeDetectorRef.detectChanges();
						break;
					case 'Compliance.registerPersonal.11':
						let refPerfil = this.viewContainerRef
							.createComponent(this.componentFactoryResolver.resolveComponentFactory(ResourcePerfilComponent));
						refPerfil.instance.inIdEmpleado = event.data.idEmpleado;
						refPerfil.instance.isViewable = 'true';
						refPerfil.instance.isdisabled =  event.data.isdisabled;
						refPerfil.instance.inTipo = event.data.tipo;
						refPerfil.changeDetectorRef.detectChanges();
						break;
					default:
				}
			}
		}));
	}
}

