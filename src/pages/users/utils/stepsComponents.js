import React from 'react';

import { MedicalInfo as NewMedicalInfo } from '../form/new/medicalInfo';
import { MembershipInfo as NewMembershipInfo } from '../form/new/membershipInfo';
import { BasicInfo as NewBasicInfo } from '../form/new/basicInfo';

import { MedicalInfo as EditMedicalInfo } from '../form/edit/medicalInfo';
import { MembershipInfo as EditMembershipInfo } from '../form/edit/membershipInfo';
import { BasicInfo as EditBasicInfo } from '../form/edit/basicInfo';

export const newUserComponents = (form, prev, next, finish) => [
  {
    key: 'Basic Info',
    component: () => {
      return <NewBasicInfo form={form} next={next} />;
    },
  },
  {
    key: 'Membership',
    component: () => {
      return <NewMembershipInfo form={form} next={next} prev={prev} />;
    },
  },
  {
    key: 'Medical Record',
    component: () => {
      return <NewMedicalInfo form={form} prev={prev} finish={finish} />;
    },
  },
];

export const editUserComponents = ([roles, gender, user] = []) => [
  {
    key: 'Basic Info',
    component: () => {
      return <EditBasicInfo gender={gender} role={roles} user={user} />;
    },
  },
  {
    key: 'Membership',
    component: () => {
      return <EditMembershipInfo user={user} />;
    },
  },
  {
    key: 'Medical Record',
    component: () => {
      return <EditMedicalInfo user={user} />;
    },
  },
];
