'use strict';

angular.module('linagora.esn.admin')
.constant('ADMIN_LDAP_MAPPING', ['firstname', 'lastname', 'email', 'description', 'main_phone', 'office_location', 'building_location', 'service', 'job_title'])

.controller('adminLdapFormController', function($stateParams, ADMIN_LDAP_MAPPING) {
  var self = this;

  self.domainId = $stateParams.domainId;
  self.AVAILABLE_KEYS = ADMIN_LDAP_MAPPING;
  self.ldapConfig.configuration.mapping = self.ldapConfig.configuration.mapping || {};

  self.delete = function(form) {
    self.ldapConfig.deleted = true;
    form.$setDirty();
  };

  self.undo = function() {
    self.ldapConfig.deleted = false;
  };
});
