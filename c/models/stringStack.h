#ifndef STRING_STACK_H
#define STRING_STACK_H

#include <string.h>

typedef struct StringStack {
    int count, capacity;
    char *list[];
} StringStack;

StringStack* initStringStack();
int push(StringStack* self, const char *str);
char* pop(StringStack* self);
void destroy(StringStack* self);

#endif