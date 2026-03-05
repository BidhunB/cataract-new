
import torch
import torch.nn as nn
from sklearn.metrics import accuracy_score

def test_multiclass_accuracy():
    print("Testing Multiclass Accuracy Logic (train_multiclass.py)...")
    # Logic: preds = argmax, accuracy_score
    outputs = torch.tensor([
        [0.1, 0.9, 0.0], # Class 1
        [0.8, 0.1, 0.1], # Class 0
        [0.2, 0.3, 0.5]  # Class 2
    ])
    
    labels = torch.tensor([1, 0, 2]) # All correct
    
    preds = torch.argmax(outputs, dim=1)
    print(f"Preds: {preds}")
    
    acc = accuracy_score(labels.numpy(), preds.numpy())
    print(f"Accuracy: {acc}")
    
    assert acc == 1.0
    print("Multiclass Accuracy Logic Passed.\n")

if __name__ == "__main__":
    test_multiclass_accuracy()
