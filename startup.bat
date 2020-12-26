Pushd "%~dp0\src\"
start runBackend.bat
popd
Pushd "%~dp0\src\layouts\munich-eSports-PB\"
start runFrontend.bat
popd