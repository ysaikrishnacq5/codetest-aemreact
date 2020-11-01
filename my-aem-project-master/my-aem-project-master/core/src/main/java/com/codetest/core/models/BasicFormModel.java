package com.codetest.core.models;

import javax.annotation.Nonnull;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

@Model(adaptables = SlingHttpServletRequest.class,
resourceType = BasicFormModel.RESOURCE_TYPE,
adapters = {BasicFormModel.class, ComponentExporter.class},
defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class BasicFormModel implements ComponentExporter {

	
	protected static final String RESOURCE_TYPE = "my-aem-project/components/content/basic-form";
	@ValueMapValue(name = "heading")
	  private String heading;

	  @ValueMapValue(name = "subheading")
	  private String subheading;
	  
	  public String getHeading() {
		return heading;
	}


	public String getSubheading() {
		return subheading;
	}



	@Nonnull
	  @Override
	  public String getExportedType() {
	    return RESOURCE_TYPE;
	  }

}
