/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/

import { test } from 'mocha';
import { e2eContainer } from '../../inversify.config';
import { CLASSES, TYPES } from '../../inversify.types';
import { Ide } from '../../pageobjects/ide/Ide';
import { ICheLoginPage } from '../../pageobjects/login/ICheLoginPage';
import { TestConstants } from '../../TestConstants';
import { DriverHelper } from '../../utils/DriverHelper';
import { TestWorkspaceUtil } from '../../utils/workspace/TestWorkspaceUtil';
import { OpenshiftPlugin, OpenshiftAppExplorerToolbar } from '../../pageobjects/ide/OpenshiftPlugin';

const driverHelper: DriverHelper = e2eContainer.get(CLASSES.DriverHelper);
const ide: Ide = e2eContainer.get(CLASSES.Ide);
const loginPage: ICheLoginPage = e2eContainer.get<ICheLoginPage>(TYPES.CheLogin);
const testWorkspaceUtils: TestWorkspaceUtil = e2eContainer.get<TestWorkspaceUtil>(TYPES.WorkspaceUtil);
const openshiftPlugin: OpenshiftPlugin = e2eContainer.get(CLASSES.OpenshiftPlugin);
const namespace: string = TestConstants.TS_SELENIUM_USERNAME;
suite('Openshift connector user story', async () => {
    const workspacePrefixUrl: string = `${TestConstants.TS_SELENIUM_BASE_URL}/dashboard/#/ide/${TestConstants.TS_SELENIUM_USERNAME}/`;
    let wsName: string;
    suiteSetup(async function () {
        const wsConfig = await testWorkspaceUtils.getBaseDevfile();
        wsName = wsConfig!.metadata!.name!;
        wsConfig.components = [
            {
                'id': 'redhat/vscode-openshift-connector/latest',
                'type': 'chePlugin'
            }
        ];

        //await testWorkspaceUtils.createWsFromDevFile(wsConfig);
    });

    test('Login into workspace and open tree container', async () => {
        await driverHelper.navigateToUrl(workspacePrefixUrl + wsName);
        await loginPage.login();
        await ide.waitWorkspaceAndIde(namespace, wsName);
        await driverHelper.wait(5000);
        await openshiftPlugin.clickOnOpenshiftToollBarIcon();
        await openshiftPlugin.clickOnApplicationToolbarItem(OpenshiftAppExplorerToolbar.LogIntoCluster);
        await driverHelper.wait(5000);
    });

});




