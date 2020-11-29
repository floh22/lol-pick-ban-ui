Pushd "%~dp0\src\"
start installBackend.bat
Pushd "%~dp0\src\layouts\munich-eSports-PB\"
start installPB.bat
popd
Pushd "%~dp0\src\layouts\munich-eSports-Ingame\"
start installIngame.bat
popd