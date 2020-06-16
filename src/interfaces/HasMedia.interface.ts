export interface HasMediaInterface {
    onDroppedEvent(event: Event): void;

    onChangeEvent(event: Event): void;

    storeMedia(): void;

    deleteMedia(media: any): void;
}
