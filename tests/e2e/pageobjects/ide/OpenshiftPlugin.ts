/*********************************************************************
 * Copyright (c) 2019 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/
import { injectable, inject } from 'inversify';
import { CLASSES } from '../../inversify.types';
import { DriverHelper } from '../../utils/DriverHelper';
import { Ide, LeftToolbarButton } from './Ide';
import { TestConstants } from '../../TestConstants';
import { Logger } from '../../utils/Logger';
import { By } from 'selenium-webdriver';

export enum OpenshiftAppExplorerToolbar {
    ReportExtensionIssueOnGitHub= 'Report Extension Issue on GitHub',
    RefreshView = 'Refresh View',
    SwitchContexts = 'Switch Contexts',
    LogIntoCluster = 'Log in to cluster'
}

@injectable()
export class OpenshiftPlugin {


    constructor(@inject(CLASSES.DriverHelper) private readonly driverHelper: DriverHelper,
                @inject(CLASSES.Ide) private readonly ide: Ide,
    ) {
    }


    async clickOnOpenshiftToollBarIcon(timeout: number = TestConstants.TS_SELENIUM_DEFAULT_TIMEOUT) {
        Logger.debug(`OpenshiftPlugin.clickOnOpenshiftTollBar`);
        await this.ide.waitAndClickRightToolbarButton(LeftToolbarButton.Openshift, timeout);
    }

    async waitOpenshiftConnectorTree(timeout: number = TestConstants.TS_SELENIUM_DEFAULT_TIMEOUT) {
        Logger.debug(`OpenshiftPlugin.waitOpenshiftConnectorTree`);
        await this.driverHelper.waitPresence(By.id('openshiftProjectExplorer'), timeout);
    }

    async clicKOnApplicationToolbarItem(item: OpenshiftAppExplorerToolbar, timeout: number = TestConstants.TS_SELENIUM_DEFAULT_TIMEOUT) {
        Logger.debug(`OpenshiftPlugin.waitOpenshiftConnectorTree`);
        await this.driverHelper.waitPresence(By.css(`div [title='${item}']`), timeout);
    }

    async clickOnApplicationToolbarItem(item: OpenshiftAppExplorerToolbar, timeout: number = TestConstants.TS_SELENIUM_DEFAULT_TIMEOUT) {
        Logger.debug(`OpenshiftPlugin.waitOpenshiftConnectorTree`);
        await this.driverHelper.waitAndClick(By.css(`div [title='${item}']`), timeout);
    }
}
