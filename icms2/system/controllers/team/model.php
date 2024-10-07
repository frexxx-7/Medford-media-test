<?php

class modelTeam extends cmsModel
{
  public function getAllTeams()
  {
    $all_team = $this->get('teams');
    $isAdmin = cmsUser::isAdmin();

    return [
      'all_team' => $all_team,
      'isAdmin' => $isAdmin
    ];
  }

  public function getOneTeam($itemId)
  {
    $team_item = $this->getItemById('teams', $itemId);
    $isAdmin = cmsUser::isAdmin();

    return [
      'team_item' => $team_item,
      'isAdmin' => $isAdmin
    ];
  }
  public function insertOrUpdateTeam($params)
  {
    if ($params["item_id"])
      //$team_item = $this->insertOrUpdate('teams', ['id' => $params["item_id"], 'active' => $params["active"], 'fullName' => $params["fullName"], 'description' => $params["description"], 'image' => $params["image"]], false);
    
      $team_item = $this->update('teams', $params["item_id"], ['active' => $params["active"], 'fullName' => $params["fullName"], 'description' => $params["description"], 'image' => $params["image"]]);
    else
      $team_item = $this->insert('teams', ['active' => $params["active"], 'fullName' => $params["fullName"], 'description' => $params["description"], 'image' => $params["image"]]);
    return $team_item;
  }

  public function deletTeam($itemId){
    $team_item = $this->delete('teams', $itemId);
    return $team_item;
  }
}
