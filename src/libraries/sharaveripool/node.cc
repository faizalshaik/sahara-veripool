#include <napi.h>
#include <pthread.h>
#include "global.h"
#include "utils.hh"
#include <string.h>
#include <vector>
#include <unistd.h>

#include <ngspice/sharedspice.h>
extern int export_main(int argc, char** argv, char** /*env*/);

Napi::Boolean test(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  
  //verilator -Wall --cc --exe --build sim_main.cpp our.v
  const char* args[7] = {
    "/usr/bin/verilator_bin",
    "-Wall",
    "--cc",
    "--exe",
    "--build",
    "/home/faizal/work/test/sim_main.cpp",
    "/home/faizal/work/test/our.v",
  };
  export_main(7, (char**)args, nullptr);

  // const char* args[6] = {
  //   "-Wall",
  //   "--cc",
  //   "--exe",
  //   "--build",
  //   "/home/faizal/work/test/sim_main.cpp",
  //   "/home/faizal/work/test/our.v",
  // };

  // export_main(6, (char**)args, nullptr);

  return Napi::Boolean::New(env, true);
}



/*--------- *
 * General  *
 * -------- */
Napi::Object getInfo(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();

  printf("this is test ");

  return Napi::Object::New(env);
}

/*--------------- *
 * Configuration  *
 * -------------- */
Napi::Boolean setConfig(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();

  if (info.Length() != 1 || !info[0].IsString())
  {
    throw Napi::TypeError::New(env, "Json string expected");
  }
  // config.from_json(info[0].ToString().Utf8Value());
  return Napi::Boolean::New(env, true);
}

Napi::String getConfig(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  // std::string res = config.to_json().dump();
  // return Napi::String::New(env, res.c_str());
  return Napi::String::New(env, "");
}

/*---------- *
 * Commands  *
 * --------- */
Napi::Boolean start(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();

  if (Global::instance()->_started)
    return Napi::Boolean::New(env, false);
  Global::instance()->_started = true;
  return Napi::Boolean::New(env, true);
}


// export all functions
Napi::Object Init(Napi::Env env, Napi::Object exports)
{

  exports.Set(Napi::String::New(env, "test"),
              Napi::Function::New(env, test));

  exports.Set(Napi::String::New(env, "getInfo"),
              Napi::Function::New(env, getInfo));
  exports.Set(Napi::String::New(env, "setConfig"),
              Napi::Function::New(env, setConfig));
  exports.Set(Napi::String::New(env, "getConfig"),
              Napi::Function::New(env, getConfig));
  exports.Set(Napi::String::New(env, "start"),
              Napi::Function::New(env, start));
  return exports;
}

NODE_API_MODULE(SaharaSpice, Init)
