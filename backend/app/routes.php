<?php
declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (App $app) {
    $app->options('/{routes:.+}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

//  $app->add(function ($request, $handler) {
//    $response = $handler->handle($request);
//    return $response
//      ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5000')
//      ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
//      ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//  });

    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write('Hello world 33!');
        return $response;
    });

    $app->get('/collections', function (Request $request, Response $response) {
	    $c = file_get_contents("../var/assets/collections.json");
      $response->getBody()->write($c);
      return $response
	      ->withHeader('Content-Type', 'application/json')
        ->withHeader('Access-Control-Allow-Origin', 'http://localhost:5000')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    });

    $app->group('/users', function (Group $group) {
        $group->get('', ListUsersAction::class);
        $group->get('/{id}', ViewUserAction::class);
    });
};
