<?php
class team extends cmsFrontend
{

  public function team_($params)
  {
    if ($_SERVER['REQUEST_METHOD'] == "GET") {
      if ($params["item_id"])
        return $this->model->getOneTeam($params["item_id"]);
      else
        return $this->model->getAllTeams();
    } elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
      return $this->model->insertOrUpdateTeam($params);
    } elseif ($_SERVER['REQUEST_METHOD'] == "PUT") {
      return $this->model->insertOrUpdateTeam($params);
    } elseif ($_SERVER['REQUEST_METHOD'] == "DELETE") {
      return $this->model->deletTeam($params["item_id"]);
    }
    //$_SERVER['REQUEST_METHOD'];
    //return $this->model->getAllTeams();
    return $params;
  }

}