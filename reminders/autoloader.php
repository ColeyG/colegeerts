<?php
spl_autoload_register(function ($className) {
  $path = __DIR__ . '/php/' . str_replace('\\', '/', $className) . '.php';

  if (file_exists($path)) {
    require $path;
  }
});
