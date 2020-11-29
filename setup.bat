Pushd "%~dp0\src\"
start installBackend.bat
Pushd "%~dp0\src\layouts\munich-eSports-PB\"
start installFrontend.bat
popd
Pushd "%~dp0\src\layouts\munich-eSports-Ingame\"
start installFrontend.bat
popd