<?php
use PHPUnit\Framework\TestCase;

require_once __DIR__ . '\..\..\core\request.php';
require_once __DIR__ . '\..\..\core\core.php';
require_once __DIR__ . '\..\..\core\model.php';
require_once __DIR__ . '\..\..\core\config.php';
require_once __DIR__ . '\..\..\core\user.php';
require_once __DIR__ . '\..\..\core\eventsmanager.php';
require_once __DIR__ . '\..\..\core\cache.php';
require_once __DIR__ . '\..\..\core\database.php';
require_once 'model.php';
define('PATH', dirname(__FILE__));

class modelTest extends TestCase
{
  protected $model;

  protected function setUp(): void
  {
    $this->model = new modelTeam();
  }

  public function testGetAllTeams()
  {
    $this->model = $this->getMockBuilder(modelTeam::class)
      ->onlyMethods(['getAllTeams'])
      ->getMock();

    $this->model->method('getAllTeams')->willReturn([
      'all_team' => [],
      'isAdmin' => true,
    ]);

    $result = $this->model->getAllTeams();

    $this->assertIsArray($result);
    $this->assertArrayHasKey('all_team', $result);
    $this->assertArrayHasKey('isAdmin', $result);
  }

  public function testGetOneTeam()
  {
    $this->model = $this->getMockBuilder(modelTeam::class)
      ->onlyMethods(['getOneTeam'])
      ->getMock();

    $itemId = 18;

    $this->model->method('getOneTeam')->willReturn([
      'team_item' => [],
      'isAdmin' => true,
    ]);

    $result = $this->model->getOneTeam($itemId);

    $this->assertIsArray($result);
    $this->assertArrayHasKey('team_item', $result);
    $this->assertArrayHasKey('isAdmin', $result);
  }

  public function testInsertOrUpdateTeamInsert()
  {
    $this->model = $this->getMockBuilder(modelTeam::class)
      ->onlyMethods(['insert', 'update'])
      ->getMock();

    $params = ['active' => 1, 'fullName' => 'New Team', 'description' => 'Description', 'image' => 'image.png'];

    $this->model->method('insert')->willReturn(['id' => 3]);

    $result = $this->model->insertOrUpdateTeam($params);

    $this->assertIsArray($result);
    $this->assertArrayHasKey('id', $result);
  }

  public function testInsertOrUpdateTeamUpdate()
  {
    $this->model = $this->getMockBuilder(modelTeam::class)
      ->onlyMethods(['insert', 'update'])
      ->getMock();

    $params = ['item_id' => 1, 'active' => 1, 'fullName' => 'Updated Team', 'description' => 'Updated Description', 'image' => 'updated_image.png'];

    $this->model->method('update')->willReturn(['id' => 1]);

    $result = $this->model->insertOrUpdateTeam($params);

    $this->assertIsArray($result);
    $this->assertArrayHasKey('id', $result);
  }

  public function testDeleteTeam()
  {
    $this->model = $this->getMockBuilder(modelTeam::class)
      ->onlyMethods(['delete'])
      ->getMock();

    $itemId = 1;

    $this->model->method('delete')->willReturn(true);

    $result = $this->model->deletTeam($itemId);

    $this->assertTrue($result);
  }
}
