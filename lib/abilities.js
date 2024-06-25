// lib/abilities.js

import { AbilityBuilder, Ability } from '@casl/ability';

export function defineAbilityFor(roles) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  roles.forEach(role => {
    role.permissions.forEach(permission => {
      can(permission.action, permission.subject);
    });
  });

  return build();
}
