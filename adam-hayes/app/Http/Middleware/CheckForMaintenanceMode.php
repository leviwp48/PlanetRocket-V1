<?php namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode as MaintenanceMode;

class CheckForMaintenanceMode {

    protected $app;

    public function __construct(Application $app)
    {
        $this->app = $app;
    }

    public function handle(Request $request, Closure $next)
    {
        if ($this->app->isDownForMaintenance() &&
            !in_array($request->getClientIp(), ['47.208.26.12', '47.208.12.26','2602:306:3592:7420:a1a6:1bba:ec90:a80f', '192.168.1.72', '99.89.39.66', '47.208.7.20']))
        {
            $maintenanceMode = new MaintenanceMode($this->app);
            return $maintenanceMode->handle($request, $next);
        }

        return $next($request);
    }

}
