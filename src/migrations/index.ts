import * as migration_20260126_005241 from './20260126_005241';
import * as migration_20260224_140353 from './20260224_140353';
import * as migration_20260225_120731 from './20260225_120731';

export const migrations = [
  {
    up: migration_20260126_005241.up,
    down: migration_20260126_005241.down,
    name: '20260126_005241',
  },
  {
    up: migration_20260224_140353.up,
    down: migration_20260224_140353.down,
    name: '20260224_140353',
  },
  {
    up: migration_20260225_120731.up,
    down: migration_20260225_120731.down,
    name: '20260225_120731',
  },
];
