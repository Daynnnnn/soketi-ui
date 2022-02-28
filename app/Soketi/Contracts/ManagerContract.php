<?php

namespace App\Soketi\Contracts;

use App\Soketi\Apps\App;
use Illuminate\Support\Collection;

interface ManagerContract
{
    public function all(): Collection;

    public function find($id): App;

    public function save($id): void;

    public function delete($id): void;
}
