<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

use Log;
use App\InnoDbTableStatistic;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
     // Just couldn't make this work. I have no idea. The documentation is as clear as mud.
     // protected $listen = [
     //     'App\Events\ProjectCreated' => [
     //         'App\Listeners\ProjectCreatedListener',
     //     ],
     // ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        Event::listen(['eloquent.created: App\Project'], function($project) {
        //Log::info("WEll, is this firing???????? Created Project) ".json_encode($project));

        $statistic = InnoDbTableStatistic::where("model_name", "=", "Project")->first();

            if(!$statistic) {
            $statistic = new InnoDbTableStatistic();
            $statistic->table_name = "inno_db_table_statistics";
            $statistic->model_name = "Project";
            $statistic->table_count = 0;
            }

        $statistic->table_count++;
        $statistic->save();

        });
        Event::listen(['eloquent.deleted: App\Project'], function($project) {
        //Log::info("WEll, is this firing???????? Created Project) ".json_encode($project));

        $statistic = InnoDbTableStatistic::where("model_name", "=", "Project")->first();

            // if(!$statistic) {
            // $statistic = new InnoDbTableStatistic();
            // $statistic->table_name = "inno_db_table_statistics";
            // $statistic->model_name = "Project";
            // $statistic->table_count = 0;
            // }

        $statistic->table_count--;
        $statistic->save();


        });

    }
}
