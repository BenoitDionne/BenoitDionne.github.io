ifs2_systems;
x = [0 1 0 0 ; 0 0 1 0];
X = {x ,x};
systxy1 = {[1,4], [2,3]};
systxy2 = {[],[1,2,3,4]};
systXY = {systxy1,systxy2};
syst = {F,L};
ifs3(X,10,syst, systXY)

systxy2 = {[],[1,2,3]};
systXY = {systxy1,systxy2};
syst = {F,S};
systXY = {systxy1,systxy2};
ifs3(X,10,syst, systXY)

ifs2_systems; ...
x = [0 1 0 0 ; 0 0 1 0]; ...
X = {x,x}; ...
systxy1 = {[1,3], [2,4]}; ...
systxy2 = {[],[1,2,3]}; ...
systXY = {systxy1,systxy2}; ...
syst = {F,S}; ...
ifs3(X,10,syst,systXY)

