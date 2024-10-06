<?php

class actionTeamApiTeamTeam extends cmsAction {
 
  /**
   * Блокировка прямого вызова экшена
   * обязательное свойство
   * @var boolean
   */
  public $lock_explicit_call = true;
  /**
   * Результат запроса
   * обязательное свойство
   * @var array
   */
  public $result;
  /**
   * Массив названий ячеек
   * которые нужно удалить из результирующего массива
   * необязательное свойство
   * @var array
   */
  public $unset_fields;
  /**
   * Флаг, обязующий проверять параметр sig запроса
   * sig привязан к домену сайта и к ip адресу посетителя
   * @var boolean
   */
  public $check_sig = false;
  /**
   * Флаг, обязующий проверять авторизацию пользователя
   * @var boolean
   */
  public $auth_required = false;
  /**
   * Флаг, обязующий проверять авторизацию пользователя
   * И принадлежность пользователя к административному доступу
   * @var boolean
   */
  public $admin_required = false;
  /**
   * Возможные параметры запроса
   * с правилами валидации
   * Если запрос имеет параметры, необходимо описать их здесь
   * Правила валидации параметров задаются по аналогии с полями форм
   * @var array
   */
  public $request_params = array();
  /**
   * Необязательный метод проверки запроса
   * В нём выполняются некий действия по валидации
   * возвращает либо false в случае успешной проверки
   * либо массив данных ошибки 
   */
  public function validateApiRequest() { return false; }
  /**
   * Основной метод работы экшена
   * Его задача заполнить свойство $this->result
   */
  public function run(){
      
      $this->result = $this->team_($this->request->getAll());
  }

}