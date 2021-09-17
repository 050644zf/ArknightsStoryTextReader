#This file is only for development purpose, feel free to remove this file

import subprocess

import pytest

def test_eventList():
    result = subprocess.run('py xlsxconvert.py -E',shell=True)
    assert result.returncode == 0

def test_langCode():
    result = subprocess.run('py xlsxconvert.py -E -L en_US',shell=True)
    assert result.returncode == 0

def test_exportEvent():
    result = subprocess.run('py xlsxconvert.py -e act3d0 -i -c',shell=True)
    assert result.returncode == 0

def test_exportFromPath():
    result = subprocess.run('py xlsxconvert.py ArknightsGameData/en_US/gamedata/story/activities/act15d0',shell=True)
    assert result.returncode == 0

def test_records():
    result = subprocess.run('py xlsxconvert.py -r -i -c',shell=True)
    assert result.returncode == 0