(function(angular) {
  angular.module('linagora.esn.admin').factory('adminModeService', adminModeService);

  function adminModeService($stateParams, $state, session, ADMIN_MODE) {
    return {
      isDomainMode: isDomainMode,
      isPlatformMode: isPlatformMode,
      goToDomainMode: goToDomainMode,
      goToPlatformMode: goToPlatformMode
    };

    function isDomainMode() {
      return !isPlatformMode();
    }

    function isPlatformMode() {
      return $stateParams.domainId === ADMIN_MODE.platform;
    }

    function goToDomainMode() {
      var domainId = session.domain._id; // we suppose that an admin manages only 1 domain

      return $state.go('admin.domain', { domainId: domainId });
    }

    function goToPlatformMode() {
      return $state.go('admin.domain', { domainId: ADMIN_MODE.platform });
    }
  }
})(angular);
