from abc import ABC, abstractmethod
from typing import Dict, Any, List

class BaseSecurityCheck(ABC):
    """Abstract base class for all security checks"""
    
    @property
    @abstractmethod
    def check_id(self) -> str:
        """Unique identifier for the check"""
        pass
    
    @property
    @abstractmethod
    def title(self) -> str:
        """Human readable title of the check"""
        pass
    
    @property
    @abstractmethod
    def description(self) -> str:
        """Detailed description of what the check does"""
        pass
    
    @abstractmethod
    def run(self, assessment_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Execute the security check
        
        Args:
            assessment_data: Dictionary containing AWS IAM data
            
        Returns:
            List of findings, each finding is a dictionary
        """
        pass