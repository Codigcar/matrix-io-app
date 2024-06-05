import React, {
  createContext, useCallback, useContext, useMemo, useState,
} from 'react';
import { getLocations } from 'src/api/PhysicalCardServices';
import { LocationProps } from 'src/api/types/requestPhysicalCardTypes';
import { logCrashlytics } from 'src/utils/Analytics';

type LocationList = {
  [key: string]: LocationProps[];
};

interface LocationContextData {
  departments: LocationProps[];
  provinces: LocationList | undefined;
  districts: LocationList | undefined;
  getDepartments: () => Promise<LocationProps[] | undefined>;
  getProvinces: (location: LocationProps) => Promise<LocationProps[] | undefined>;
  getDistricts: (location: LocationProps) => Promise<LocationProps[] | undefined>;
  loadings: {
    loadingDepartment: boolean;
    loadingProvince: boolean;
    loadingDistrict: boolean;
  };
}

type LocationProviderProps = {
  children: React.ReactNode;
};
const LocationContext = createContext<LocationContextData | undefined>(undefined);

const LocationProvider = (props: LocationProviderProps) => {
  const { children } = props;

  const codeDepartments = '000000';

  const [departments, setDepartments] = useState<LocationProps[]>([]);
  const [provinces, setProvinces] = useState<LocationList>();
  const [districts, setDistricts] = useState<LocationList>();
  const [loadings, setLoadings] = useState({
    loadingDepartment: false,
    loadingProvince: false,
    loadingDistrict: false,
  });

  const getDepartments = useCallback(async () => {
    try {
      setLoadings((originalState) => ({ ...originalState, loadingDepartment: true }));
      const responseDepartments = await getLocations(codeDepartments);
      if (responseDepartments.length) setDepartments(responseDepartments);
      return responseDepartments;
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'src/store/states/locationContext.tsx',
        service: 'PhysicalCardServices.getLocations',
        error,
      });
      throw error;
    } finally {
      setLoadings((originalState) => ({ ...originalState, loadingDepartment: false }));
    }
  }, []);

  const getProvinces = useCallback(
    async (department: LocationProps) => {
      try {
        if (provinces && department.code in provinces) return provinces[department.code];
        setLoadings((originalState) => ({ ...originalState, loadingProvince: true }));
        const provincesResponse = await getLocations(department.code);
        if (provincesResponse.length) {
          setProvinces((originalState) => {
            let provincesAux = originalState;
            if (!originalState) provincesAux = {};
            return { ...provincesAux, [department.code]: provincesResponse };
          });
        }
        return provincesResponse;
      } catch (error) {
        logCrashlytics({
          scope: 'API',
          fileName: 'src/store/states/locationContext.tsx',
          service: 'PhysicalCardServices.getLocations',
          error,
        });
        throw error;
      } finally {
        setLoadings((originalState) => ({ ...originalState, loadingProvince: false }));
      }
    },
    [provinces],
  );

  const getDistricts = useCallback(
    async (province: LocationProps) => {
      try {
        if (districts && province.code in districts) return districts[province.code];
        setLoadings((originalState) => ({ ...originalState, loadingDistrict: true }));
        const districtsResponse = await getLocations(province.code);
        if (districtsResponse.length) {
          setDistricts((originalState) => {
            let districtsAux = originalState;
            if (!originalState) districtsAux = {};
            return { ...districtsAux, [province.code]: districtsResponse };
          });
        }
        return districtsResponse;
      } catch (error) {
        logCrashlytics({
          scope: 'API',
          fileName: 'src/store/states/locationContext.tsx',
          service: 'PhysicalCardServices.getLocations',
          error,
        });
        throw error;
      } finally {
        setLoadings((originalState) => ({ ...originalState, loadingDistrict: false }));
      }
    },
    [districts],
  );

  const values = useMemo(
    () => ({
      departments,
      provinces,
      districts,
      getDepartments,
      getDistricts,
      getProvinces,
      loadings,
    }),
    [departments, provinces, districts, getDepartments, getDistricts, getProvinces, loadings],
  );

  return <LocationContext.Provider value={values}>{children}</LocationContext.Provider>;
};

const useLocation = () => {
  const location = useContext(LocationContext);
  if (!location) throw new Error('useLocation must be inside LocationProvider');
  return location;
};

export { useLocation, LocationProvider };
