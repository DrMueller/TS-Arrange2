function getLibraryNames() {
  $libPackageFiles = Get-ChildItem -File ($PSScriptRoot + '/../projects/package.json') -Recurse -Force
  $libraryNames = New-Object System.Collections.Generic.List[System.String]

  foreach ($libPackageFile in $libPackageFiles) {
    # Get the lib name
    [String]$packageContent = Get-Content $libPackageFile

    $namePosition = $packageContent.IndexOf('name');
    $nameLine = $packageContent.Substring($namePosition);

    # we remvoe the hardcoded value 'name": "', therefore start with 8 characters
    $stringLength = $nameLine.IndexOf(',') - 9;
    $name = $nameLine.Substring(8, $stringLength);

    $libraryNames.Add($name)
  }

  return $libraryNames
}

function getDistPathForLibrary([String] $libraryName) {
  $paths = $libraryName.Split('/');
  $result = 'dist'

  foreach ($path in $paths) {
    $path = $path.Replace('@', '')
    $result += '/' + $path
  }

  return $result
}

Export-ModuleMember -Function *