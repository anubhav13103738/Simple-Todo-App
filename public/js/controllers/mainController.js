/**
 * Created by annu1 on 8/27/2017.
 */
app.controller("mainController",function ($scope,$window,mainFactory) {
    $scope.show = false;
    $scope.editShow = false;
    $scope.sortType = 'name';
    $scope.sortReverse = false;
    $scope.editName = "";
    $scope.editDesc = "";
    var editId = "";
    $scope.todos=[];
    $scope.getData = function() {
        var promise = mainFactory.getter();
        function pass(data){
            $scope.todos=data;
            console.log("todos",$scope.todos);
            $scope.show = true;
        }
        function fail(er){
            $scope.error=er;
        }
        promise.then(pass,fail);
    };

    $scope.editInitialize = function(name,desc,id){
        $scope.editName = name;
        $scope.editDesc = desc;
        editId = id;
        $scope.editShow=true;
    };

    $scope.edit =function () {
        mainFactory.editor($scope.editName, $scope.editDesc,editId);
        $scope.editShow=false;
        $scope.getData();
        //we can use these if we want to refresh the page with crud operations
        $window.location.href='/';
    };

    $scope.delete = function(name,desc,id){
        mainFactory.deleter(name, desc,id);
        $scope.getData();
        //we can use these if we want to refresh the page with crud operations
        $window.location.href='/';
    };
    $scope.sort = function () {
        $scope.sortType = 'name';
        $scope.sortReverse = !$scope.sortReverse;
    }
    $scope.insert = function () {
        mainFactory.setter($scope.name, $scope.description);
        $scope.getData();
        //we can use these if we want to refresh the page with crud operations
        $window.location.href='/';
    };

});