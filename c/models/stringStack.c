#include "stringStack.h"
#include <stdlib.h>
#include <string.h>

StringStack* initStringStack() {
    size_t size = sizeof(StringStack) + sizeof(char*) * 1;
    StringStack* self = (StringStack*)malloc(size);
    if (!self) return NULL;

    self->count = 0;
    self->capacity = 1;

    return self;
}

int push(StringStack* self, const char *str) {
    if (self->count >= self->capacity) {
        int newCapacity = self->capacity * 2;

        size_t newSize = sizeof(StringStack) + sizeof(char*) * newCapacity;
        
        StringStack* newSelf = (StringStack*)realloc(self, newSize);
        if (!newSelf) return 0;

        self = newSelf;
        self->capacity = newCapacity;
    }

    char *copy = strdup(str);
    if (!copy) return 0;

    self->list[self->count] = copy;
    self->count++;

    return 1;
}

char* pop(StringStack* self) {
    if (!self || self->count == 0) return NULL;

    char*result = self->list[--self->count];
    self->list[self->count] = NULL;
    return result;
}

void destroy(StringStack* self) {
    if (!self) return;

    for (int i = 0; i < self->count; i++) {
        free(self->list[i]);
    }
    free(self);
}