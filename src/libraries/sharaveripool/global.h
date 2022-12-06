/*
 * global.h
 */

#ifndef SRC_GLOBAL_H_
#define SRC_GLOBAL_H_
#include <map>
#include <math.h>


class Global
{
public:
    Global();
    virtual ~Global();
    bool _started;
protected:
    static Global *m_inst;

public:
    static Global *instance();
};

#endif /* SRC_GLOBAL_H_ */
