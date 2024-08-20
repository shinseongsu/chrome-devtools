import * as UI from '../../ui/legacy/legacy.js';
export declare class ComputedStyleWidget extends UI.ThrottledWidget.ThrottledWidget {
    #private;
    private computedStyleModel;
    private readonly showInheritedComputedStylePropertiesSetting;
    private readonly groupComputedStylesSetting;
    input: Element;
    private filterRegex;
    private readonly noMatchesElement;
    private readonly linkifier;
    private readonly imagePreviewPopover;
    constructor();
    onResize(): void;
    wasShown(): void;
    doUpdate(): Promise<void>;
    private fetchMatchedCascade;
    private rebuildAlphabeticalList;
    private rebuildGroupedList;
    private buildTraceNode;
    private createTreeNodeRenderer;
    private buildTreeNode;
    private handleContextMenuEvent;
    private computePropertyTraces;
    private computeNonInheritedProperties;
    filterComputedStyles(this: ComputedStyleWidget, regex: RegExp | null): Promise<void>;
    private nodeFilter;
    private filterAlphabeticalList;
    private filterGroupLists;
}
