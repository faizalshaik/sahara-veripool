#ifndef VERILATORLIB_H_INCLUDED
#define VERILATORLIB_H_INCLUDED

#ifdef __cplusplus
   extern "C" {
#endif

#if defined(__MINGW32__) || defined(_MSC_VER) || defined(__CYGWIN__)
  #ifdef SHARED_MODULE
    #define IMPEXP __declspec(dllexport)
  #else
    #define IMPEXP __declspec(dllimport)
  #endif
#else
  /* use with gcc flag -fvisibility=hidden */
  #if __GNUC__ >= 4
    #define IMPEXP __attribute__ ((visibility ("default")))
    #define IMPEXPLOCAL  __attribute__ ((visibility ("hidden")))
  #else
    #define IMPEXP
    #define IMPEXP_LOCAL
  #endif
#endif


    IMPEXP
    int export_main(int argc, char** argv, char** /*env*/);

#ifdef __cplusplus
   }
#endif

#endif /* VERILATORLIB_H_INCLUDED */