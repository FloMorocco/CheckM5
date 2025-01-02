import { NavigatedData, Page } from '@nativescript/core';
import { MainViewModel } from './view-models/main-view-model';

export function navigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new MainViewModel();
}