
'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminDomainsService', function() {

  var $rootScope;
  var domainAPI, ADMIN_DOMAINS_EVENTS;
  var adminDomainsService, jamesClientProvider, adminDomainConfigService;
  var $windowMock, jamesClientInstanceMock;

  beforeEach(function() {
    module('linagora.esn.admin');

    jamesClientInstanceMock = {};

    $windowMock = {
      james: {
        Client: function() {
          return jamesClientInstanceMock;
        }
      }
    };

    angular.mock.module(function($provide) {
      $provide.value('$window', $windowMock);
    });

    inject(function(
      _$rootScope_,
      _adminDomainsService_,
      _domainAPI_,
      _jamesClientProvider_,
      _adminDomainConfigService_,
      _ADMIN_DOMAINS_EVENTS_
    ) {
      $rootScope = _$rootScope_;
      adminDomainsService = _adminDomainsService_;
      domainAPI = _domainAPI_;
      jamesClientProvider = _jamesClientProvider_;
      adminDomainConfigService = _adminDomainConfigService_;
      ADMIN_DOMAINS_EVENTS = _ADMIN_DOMAINS_EVENTS_;

      jamesClientInstanceMock.createDomain = sinon.stub().returns($q.when());
      jamesClientProvider.get = sinon.stub().returns($q.when(jamesClientInstanceMock));
      adminDomainConfigService.get = function() {
        return $q.when({});
      };
    });
  });

  describe('The create method', function() {
    it('should reject if domain is undefined', function(done) {
      adminDomainsService.create()
        .catch(function(err) {
          expect(err.message).to.equal('Domain is required');
          done();
        });

      $rootScope.$digest();
    });

    it('should broadcast an event when sucessfully to create domain', function(done) {
      domainAPI.create = sinon.stub().returns($q.when({ data: {} }));
      $rootScope.$broadcast = sinon.spy();
      var domain = {};

      adminDomainsService.create(domain).then(function() {
        expect(domainAPI.create).to.have.been.calledWith(domain);
        expect(jamesClientInstanceMock.createDomain).to.have.been.calledWith(domain.name);
        expect($rootScope.$broadcast).to.have.been.calledWith(ADMIN_DOMAINS_EVENTS.DOMAIN_CREATED, domain);

        done();
      });

      $rootScope.$digest();
    });

    it('should not reject when James domain creation fails', function(done) {
      domainAPI.create = function() { return $q.when({}); };
      jamesClientInstanceMock.createDomain = function() { return $q.reject(new Error('some error')); };

      adminDomainsService.create({}).then(function() {
        done();
      });

      $rootScope.$digest();
    });
  });

  describe('The update method', function() {
    it('should broadcast an event when sucessfully to update domain', function() {
      domainAPI.update = sinon.stub().returns($q.when());
      $rootScope.$broadcast = sinon.spy();
      var modifiedDomain = {};

      adminDomainsService.update(modifiedDomain);

      $rootScope.$digest();

      expect(domainAPI.update).to.have.been.calledWith(modifiedDomain);
      expect($rootScope.$broadcast).to.have.been.calledWith(ADMIN_DOMAINS_EVENTS.DOMAIN_UPDATED, modifiedDomain);
    });
  });
});
