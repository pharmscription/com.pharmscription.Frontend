import PatientRepository from "../service/PatientRepository"
import AHVNumberService from "../service/AHVNumberService"
import PatientService from 'ts/service/PatientService'
import Patient from '../model/patient'

import Address from 'ts/model/address'

enum Mode {
    Register,
    Edit
}

export default class UserRegisterController {
    
    controllerMode: Mode;
    cantons = ('AG AR AI BL BS BE FR GE GL GR JU LU NE NW OW ' +
    'SG SH SZ SO TG TI UR VD VS ZG ZH').split(' ').map(canton => {
        return { abbrev: canton };
    });
    patient: Patient;
    today: Date = new Date();

    /*default values*/
    

    static $inject = [
        'PatientRepository',
        'AHVNumberService',
        'PatientService',
        '$location',
        '$mdToast',
        '$translate',
        '$log'
    ];

    constructor(
        private patientRepository: PatientRepository,
        private ahvNumberService: AHVNumberService,
        private PatientService: PatientService,
        private $location: angular.ILocationService,
        private $mdToast: angular.material.IToastService,
        private $translate: angular.translate.ITranslateService,
        private $log: angular.ILogService) {
        this.setControllerMode();
        if (this.controllerMode === Mode.Register) {
            this.patient = new Patient(this.ahvNumberService.getAHVNumber());

            //Mock
            this.patient.BirthDate = new Date();
            this.patient.EMailAddress = "max@muster.com";
            this.patient.FirstName = "Max";
            this.patient.LastName = "Muster";
            this.patient.Address = new Address("Bahnhofstrasse", "666", "ZH", "Zürich", "8888");
            this.patient.Insurance = "Sanitas";
            this.patient.InsuranceNumber = "xx.xx.xx";
            this.patient.PhoneNumber = "0980980980";

        } else {
            this.patientRepository.getPatientById(this.PatientService.getPatientId()).then((foundPatient) => {
                let birthdateString = foundPatient.BirthDate.toString();
                let birthDateParts = birthdateString.split('.');
                foundPatient.BirthDate = new Date();
                foundPatient.BirthDate.setFullYear(parseInt(birthDateParts[2]));
                foundPatient.BirthDate.setMonth(parseInt(birthDateParts[1]) - 1);
                foundPatient.BirthDate.setDate(parseInt(birthDateParts[0]));
                this.patient = foundPatient;
            }, (error) => {
                this.$translate('TOAST.PATIENT-LOAD-ERROR').then((message) => {
                    this.showToast(message);
                });
                this.$log.error(error);
            });
        }

    }

    showToast(message: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }

    savePatient(patient: Patient): void {
        if (this.controllerMode === Mode.Register) {
            this.patientRepository.addPatient(patient).then((addedPatient) => {
                this.PatientService.setPatientId(addedPatient.Id);
                this.$translate('TOAST.PATIENT-SAVE-SUCCESS', { firstName: addedPatient.FirstName, lastName: addedPatient.LastName }).then((message) => {
                    this.showToast(message);
                    this.$location.url('user/overview');
                });
            }, (error) => {
                this.$log.error(error);
                this.$translate('TOAST.PATIENT-REGISTER-ERROR').then((message) => {
                    this.showToast(message);
                });
            });
        } else {
            this.patientRepository.editPatient(patient).then((editedPatient) => {
                this.PatientService.setPatientId(editedPatient.Id);
                this.$translate('TOAST.PATIENT-CHANGED-SUCCESS', { firstName: editedPatient.FirstName, lastName: editedPatient.LastName }).then((message) => {
                    this.showToast(message);
                    this.$location.url('user/overview');
                });
            }, (error) => {
                this.$log.error(error);
                this.$translate('TOAST.PATIENT-CHANGED-ERROR').then((message) => {
                    this.showToast(message);
                });
            });
        }

    }

    setControllerMode() {
        if (this.$location.url() === '/user/register') {
            this.controllerMode = Mode.Register;
        } else {
            this.controllerMode = Mode.Edit;
        }
    }
}