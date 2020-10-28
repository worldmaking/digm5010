#include <node_api.h> 
#include <assert.h>
#include <stdio.h> 
#include <stdlib.h>

#define MA_NO_DECODING
#define MA_NO_ENCODING
#define MINIAUDIO_IMPLEMENTATION
#include "miniaudio.h"

#define DEVICE_FORMAT       ma_format_f32
#define DEVICE_CHANNELS     2
#define DEVICE_SAMPLE_RATE  48000

#define ARRAYBUFFER_LENGTH  (4096*10)

ma_device_config deviceConfig;
ma_device device;

// ma_waveform sineWave;
// ma_waveform_config sineWaveConfig;

float ringBuffer[ARRAYBUFFER_LENGTH];
int t = 0;

void data_callback(ma_device* pDevice, void* pOutput, const void* pInput, ma_uint32 frameCount) {

	float* out = (float*)pOutput;
	
	for (ma_uint32 i=0; i<frameCount; i++) {
		//float s = sin(t * M_PI*2.f * 300.f/DEVICE_SAMPLE_RATE);
		float s = ringBuffer[t];
		out[i*2] = s;
		out[i*2+1] = s;
		// burn after reading
		ringBuffer[t] = 0.f;

		t++;
		if (t >= ARRAYBUFFER_LENGTH) t = 0;
	}


    // ma_waveform* pSineWave;

    // MA_ASSERT(pDevice->playback.channels == DEVICE_CHANNELS);

    // pSineWave = (ma_waveform*)pDevice->pUserData;
    // MA_ASSERT(pSineWave != NULL);

    // ma_waveform_read_pcm_frames(pSineWave, pOutput, frameCount);


	// printf("frame rate: %d\n", frameCount);

    // (void)pInput;   /* Unused. */
}

napi_value Hello(napi_env env, const napi_callback_info info) {
	napi_value result = nullptr;
    printf("hello\n");

	// sineWaveConfig = ma_waveform_config_init(DEVICE_FORMAT, DEVICE_CHANNELS, DEVICE_SAMPLE_RATE, ma_waveform_type_sine, 0.2, 220);
    // ma_waveform_init(&sineWaveConfig, &sineWave);

    deviceConfig = ma_device_config_init(ma_device_type_playback);
    deviceConfig.playback.format   = DEVICE_FORMAT;
    deviceConfig.playback.channels = DEVICE_CHANNELS;
    deviceConfig.sampleRate        = DEVICE_SAMPLE_RATE;
    deviceConfig.dataCallback      = data_callback;
    //deviceConfig.pUserData         = &sineWave;

    if (ma_device_init(NULL, &deviceConfig, &device) != MA_SUCCESS) {
        printf("Failed to open playback device.\n");
        return result;
    }

    printf("Device Name: %s\n", device.playback.name);

    if (ma_device_start(&device) != MA_SUCCESS) {
        printf("Failed to start playback device.\n");
        ma_device_uninit(&device);
        return result;
    }

	// return our audio OLA buffer:
	napi_value arraybuffer;
	if (napi_ok == napi_create_external_arraybuffer(env, ringBuffer, sizeof(ringBuffer), nullptr, nullptr, &arraybuffer)) {
		if (napi_ok == napi_create_typedarray(env, napi_float32_array, ARRAYBUFFER_LENGTH, arraybuffer, 0, &result)) {
			return result;
		}
	}

    return result;
}

napi_value Time(napi_env env, const napi_callback_info info) {
	napi_value result;
	napi_create_int32(env, t, &result);
	return result;
}

napi_value Goodbye(napi_env env, const napi_callback_info info) {
    napi_value msg;
    napi_create_string_utf8(env, "ciao", NAPI_AUTO_LENGTH, &msg);

	ma_device_uninit(&device);

    return msg;
}

napi_value Init(napi_env env, napi_value exports) {
    napi_property_descriptor export_properties[] = {
	{
		"Hello", nullptr, Hello,
		nullptr, nullptr, nullptr, napi_default, nullptr
	},
	{
		"Time", nullptr, Time,
		nullptr, nullptr, nullptr, napi_default, nullptr
	},
	{
		"Goodbye", nullptr, Goodbye,
		nullptr, nullptr, nullptr, napi_default, nullptr
	},
    };
    assert(napi_define_properties(env, exports, 
	sizeof(export_properties) / sizeof(export_properties[0]), export_properties) == napi_ok);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)