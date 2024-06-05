import ubigeoJson from 'assets/data/ubigeo.json';
import ubigeoDeliveryJson from 'assets/data/ubigeo-delivery.json';
import ubigeoAqpDeliveryJson from 'assets/data/ubigeo-aqp-delivery.json';
import { PROVINCES_DELIVERY } from '../constants';

type UbigeoType = {
  code: string;
  description: string;
  parent?: string;
};

type UbigeoDeliveryType = {
  zone: string;
  description: string;
  innings: string[];
};

type UbigeoProvinceDeliveryType = {
  code: string;
  description: string;
};

const getCities = (): UbigeoType[] => ubigeoJson.filter((item) => !item.parent);

const getTree = (code: string): UbigeoType[] => ubigeoJson.filter((item) => item.parent === code);

const getDepartmentByName = (name: string) =>
  ubigeoJson.find((item) => item.description.toLowerCase() === name.toLowerCase() && !item.parent);

const getElementByName = (name: string) =>
  ubigeoJson.find((item) => item.description.toLowerCase() === name.toLowerCase() && item.parent);

const getDistrictByNameToDelivery = (name: string) =>
  ubigeoDeliveryJson.find((item) => item.description.toLowerCase() === name.toLowerCase());

const getDistrictAuxiliarByNameToDelivery = (name: string) =>
  ubigeoAqpDeliveryJson.find((item) => item.description.toLowerCase() === name.toLowerCase());

const getProvinceByNameToDelivery = (name: string) =>
  PROVINCES_DELIVERY.find((item) => item.description.toLowerCase() === name.toLowerCase());

export {
  getCities,
  getTree,
  getDepartmentByName,
  getElementByName,
  getDistrictByNameToDelivery,
  getDistrictAuxiliarByNameToDelivery,
  getProvinceByNameToDelivery,
};

export type { UbigeoType, UbigeoDeliveryType, UbigeoProvinceDeliveryType };
