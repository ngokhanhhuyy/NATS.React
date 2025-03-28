import { use, useEffect } from "react";

const cache: Map<string, Promise<any> | null> = new Map();

export function useAsyncModelInitializer<TModel>
        (cacheKey: string, initializer: () => Promise<TModel>): TModel {
    let promise = cache.get(cacheKey);
    if (!promise) {
        promise = initializer();
        cache.set(cacheKey, promise);
    }

    useEffect(() => {
        return () => {
            cache.delete(cacheKey);
        };
    }, []);

    const model: TModel = use(promise);
    return model;
}

export function clearAsyncModelInitializerCache(): void {
    cache.clear();
};