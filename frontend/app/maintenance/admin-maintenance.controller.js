(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .controller('adminMaintenanceController', function(adminMaintenanceService) {
    var self = this;

    self.$onInit = $onInit;

    function $onInit() {
      self.actions = [
        {
          category: 'Elasticsearch',
          resourceType: 'User index',
          items: [
            {
              description: 'Correct the index configuration and reindex data (slow)',
              buttonTitle: 'Reindex',
              onClick: reindexUsers
            },
            {
              description: 'Correct the index configuration (quick)',
              buttonTitle: 'Reconfigure',
              onClick: reconfigureUsersIndex
            }
          ]
        }
      ];
    }

    function reindexUsers() {
      adminMaintenanceService.reindexUsers();
    }

    function reconfigureUsersIndex() {
      adminMaintenanceService.reconfigureUsersIndex();
    }
  });
})(angular);
