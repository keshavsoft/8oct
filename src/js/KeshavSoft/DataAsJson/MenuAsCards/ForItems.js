
let LocalBreadcrumbItemClick = ({ inFolderName, inFileNameWithExtension, inItemName }) => {
    this.ForScreens.FetchAsPost(inFolderName, inFileNameWithExtension, inItemName);
};

let FetchAsPost = (inFolderName, inFileNameWithExtension) => {
    let jVarLocalFolderName = inFolderName;
    let jVarLocalFileNameWithExtension = inFileNameWithExtension;

    let jVarLocalRoute = jVarGlobalClientObject.Config.RouteStart.Start;
    let jVarLocalSubRoute = jVarGlobalClientObject.Config.RouteStart.SubRoute;

    let jVarLocalFetchUrl = `/${jVarLocalRoute}/${jVarLocalSubRoute}/Data/FromFolder/FromFile/Items/GetData/AsArray`;

    fetch(jVarLocalFetchUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inFolderName: jVarLocalFolderName,
            inFileNameWithExtension: jVarLocalFileNameWithExtension
        })
    }).then(response => {
        if (response.status === 403) {
            let jVarLocalModalId = this.Config.Ht.HtmlIds.Modals.LoginModalId;
            let jVarLocalLoginFormPopUpId = document.getElementById(jVarLocalModalId);

            if (jVarLocalLoginFormPopUpId !== null) {
                var myModal = new bootstrap.Modal(jVarLocalLoginFormPopUpId, { keyboard: false, focus: true });
                myModal.show();
            };
            return null;
        };

        return response.json();
    }).then(dataFromApi => {
        if (dataFromApi !== null) {
            this.ForItems.ToUi.StartFunc({
                inFilesObjects: dataFromApi,
                inFolderName: jVarLocalFolderName,
                inFileNameWithExtension: jVarLocalFileNameWithExtension
            });

            // this.ForItems.CommonFuncs.BuildBreadcrumb({
            //     inFolderName: jVarLocalFolderName,
            //     inFileNameWithExtension: jVarLocalFileNameWithExtension
            // });
        };
    });
};

// CommonFuncs: {
//     BuildBreadcrumb: ({ inFolderName, inFileNameWithExtension }) => {
//         let jVarLocalFolderName = inFolderName;
//         let jVarLocalFileNameWithExtension = inFileNameWithExtension;

//         let jVarLocalbreadcrumbObject = {};
//         jVarLocalbreadcrumbObject.Home = {};
//         jVarLocalbreadcrumbObject[jVarLocalFolderName] = {
//             onClick: `jGlobalClassForCardMenu.ForFolders.Breadcrumb.ItemClick({inFolderName:'${jVarLocalFolderName}'})`
//         };

//         jVarLocalbreadcrumbObject[jVarLocalFileNameWithExtension] = {
//             onClick: `jGlobalClassForCardMenu.ForFiles.Breadcrumb.ItemClick(
//                                 {inFolderName:'${jVarLocalFolderName}',
//                                 inFileNameWithExtension:'${jVarLocalFileNameWithExtension}'})`
//         };

//         jFBuildBreadcrumb(jVarLocalbreadcrumbObject);
//     }
// };

ToUi: {
    StartFunc: ({ inFolderName, inFileNameWithExtension, inFilesObjects }) => {
        let jVarLocalFolderName = inFolderName;
        let jVarLocalFileNameWithExtension = inFileNameWithExtension;
        let jVarLocalFilesObjects = inFilesObjects;

        let jVarLocalKCont1 = document.getElementById("KCont1");
        let jVarLocalNewRow = document.createElement("div");
        jVarLocalNewRow.setAttribute("class", "row");

        Object.entries(jVarLocalFilesObjects).forEach(
            ([key, value]) => {
                let jVarLocalFromLoop = this.ForItems.ToUi.CommonFuncs.LoopFunc({
                    inFolderName: jVarLocalFolderName,
                    inFileNameWithExtension: jVarLocalFileNameWithExtension,
                    inItemName: value.ItemName,
                    inRowCount: value.RowCount,
                    inScreenCount: value.ScreenCount
                });

                jVarLocalNewRow.appendChild(jVarLocalFromLoop);
            }
        );

        jVarLocalKCont1.innerHTML = " ";
        jVarLocalKCont1.appendChild(jVarLocalNewRow);
    },
        CommonFuncs: {
        LoopFunc: ({ inFolderName, inFileNameWithExtension, inItemName, inRowCount, inScreenCount }) => {
            let jVarLocalFolderName = inFolderName;
            let jVarLocalFileNameWithExtension = inFileNameWithExtension;
            let jVarLocalItemName = inItemName;

            let jVarLocalTemplate = document.getElementById("TemplateForItemCard");
            var jVarLocalTemplateClone = jVarLocalTemplate.cloneNode(true);

            jVarLocalTemplateClone.content.querySelector("a").setAttribute("onclick", `jGlobalClassForCardMenu.ForScreens.FetchAsPost('${jVarLocalFolderName}','${inFileNameWithExtension}','${jVarLocalItemName}','${inRowCount}')`);
            jVarLocalTemplateClone.content.querySelector(".ItemNameClass").innerHTML = jVarLocalItemName;
            jVarLocalTemplateClone.content.querySelector(".RowCountClass").innerHTML = inRowCount;
            jVarLocalTemplateClone.content.querySelector(".ScreenCountClass").innerHTML = inScreenCount;

            return document.importNode(jVarLocalTemplateClone.content, true);
        }
    }
};

export { FetchAsPost }