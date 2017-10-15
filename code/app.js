angular.module("Webmail", [ "ngSanitize" ])
.controller("WebmailCtrl",  function($scope, $location) {
	
	$scope.dossiers = [
		{ value: "RECEPTION", label: 'home', text: 
		"this is a home page"
		 }, 
		{ value: "ARCHIVES", label: "course", text: 
		"thisis a list of courses"
		  },
		{ value: "ENVOYES", label: "sign in", text: 
		"list of courses"
		 },
		{ value: "SPAM", label: "contact", text: 
		"contact part"
		 }
	];

	$scope.dossierCourant = null;

 

	$scope.selectionDossier = function(dossier) {
		$scope.dossierCourant = dossier;
	}

	

	$scope.$watch(function() {
		return $location.path();
	}, function(newPath) {
		var tabPath = newPath.split("/");
		if (tabPath.length > 1) {
			var valDossier = tabPath[1];
			$scope.dossiers.forEach(function(item) {
				if (item.value == valDossier) {
					$scope.selectionDossier(item);
				}
			});
			if (tabPath.length > 2) {
				var idMail = tabPath[2];
				$scope.dossierCourant.emails.forEach(function(item) {
					if (item.id == idMail) {
						$scope.selectionEmail(item);
					}
				});
			}
		}
	});

	
});





