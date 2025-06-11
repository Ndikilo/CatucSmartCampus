import { useState, useCallback } from 'react';
import { Device, DeviceType } from '../types';
import { DEVICE_TYPES } from '../constants';

const INITIAL_DEVICES: Device[] = [
  // Desktops
  { id: 1, name: 'PC-101', type: DEVICE_TYPES.DESKTOP, status: 'available', specs: 'i7, 16GB RAM, 512GB SSD' },
  { id: 2, name: 'PC-102', type: DEVICE_TYPES.DESKTOP, status: 'in-use', specs: 'i7, 16GB RAM, 512GB SSD' },
  { id: 3, name: 'PC-103', type: DEVICE_TYPES.DESKTOP, status: 'available', specs: 'i7, 16GB RAM, 1TB SSD' },
  { id: 4, name: 'PC-104', type: DEVICE_TYPES.DESKTOP, status: 'available', specs: 'i7, 32GB RAM, 1TB SSD' },
  { id: 5, name: 'PC-105', type: DEVICE_TYPES.DESKTOP, status: 'available', specs: 'i5, 8GB RAM, 512GB SSD' },
  { id: 6, name: 'PC-106', type: DEVICE_TYPES.DESKTOP, status: 'available', specs: 'i5, 8GB RAM, 1TB HDD' },
  { id: 7, name: 'PC-107', type: DEVICE_TYPES.DESKTOP, status: 'available', specs: 'i7, 16GB RAM, 1TB SSD' },
  { id: 8, name: 'PC-108', type: DEVICE_TYPES.DESKTOP, status: 'in-use', specs: 'i7, 32GB RAM, 1TB SSD' },
  { id: 9, name: 'PC-109', type: DEVICE_TYPES.DESKTOP, status: 'available', specs: 'i5, 8GB RAM, 512GB SSD' },
  { id: 10, name: 'PC-110', type: DEVICE_TYPES.DESKTOP, status: 'available', specs: 'i7, 16GB RAM, 1TB SSD' },
  // Laptops
  { id: 11, name: 'LP-201', type: DEVICE_TYPES.LAPTOP, status: 'available', specs: 'i5, 8GB RAM, 256GB SSD' },
  { id: 12, name: 'LP-202', type: DEVICE_TYPES.LAPTOP, status: 'available', specs: 'i5, 8GB RAM, 512GB SSD' },
  { id: 13, name: 'LP-203', type: DEVICE_TYPES.LAPTOP, status: 'in-use', specs: 'i7, 16GB RAM, 512GB SSD' },
  { id: 14, name: 'LP-204', type: DEVICE_TYPES.LAPTOP, status: 'available', specs: 'i5, 8GB RAM, 256GB SSD' },
  { id: 15, name: 'LP-205', type: DEVICE_TYPES.LAPTOP, status: 'available', specs: 'i7, 16GB RAM, 1TB SSD' },
  { id: 16, name: 'LP-206', type: DEVICE_TYPES.LAPTOP, status: 'available', specs: 'i5, 8GB RAM, 512GB SSD' },
  { id: 17, name: 'LP-207', type: DEVICE_TYPES.LAPTOP, status: 'in-use', specs: 'i7, 16GB RAM, 512GB SSD' },
  { id: 18, name: 'LP-208', type: DEVICE_TYPES.LAPTOP, status: 'available', specs: 'i5, 8GB RAM, 256GB SSD' },
  { id: 19, name: 'LP-209', type: DEVICE_TYPES.LAPTOP, status: 'available', specs: 'i7, 16GB RAM, 1TB SSD' },
  { id: 20, name: 'LP-210', type: DEVICE_TYPES.LAPTOP, status: 'available', specs: 'i5, 8GB RAM, 512GB SSD' },
];

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [deviceType, setDeviceType] = useState<DeviceType>(DEVICE_TYPES.DESKTOP);

  const bookDevice = useCallback((deviceId: number) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === deviceId ? { ...device, status: 'in-use' } : device
      )
    );
  }, []);

  const releaseDevice = useCallback((deviceId: number) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === deviceId ? { ...device, status: 'available' } : device
      )
    );
  }, []);

  const getDeviceById = useCallback(
    (id: number) => devices.find(device => device.id === id),
    [devices]
  );

  const getAvailableDevices = useCallback(
    (type?: DeviceType) =>
      devices.filter(
        device =>
          device.status === 'available' && (type ? device.type === type : true)
      ),
    [devices]
  );

  return {
    devices,
    deviceType,
    setDeviceType,
    bookDevice,
    releaseDevice,
    getDeviceById,
    getAvailableDevices,
  };
};
